import { NativeModules } from "react-native";
import reportTemplates from "../../reports/waterbill";

// (async () => {
//   const lib = await import("../reports/waterbill");
//   reportTemplates = lib.default;
// })();

const getFields = (template) => {
  const fieldRe = /\${.+?}/gi;
  const fields = [];
  template.match(fieldRe).forEach((paramField) => {
    const field = paramField.match(/\${(.+?)}/)[1];
    fields.push([paramField, field]);
  });
  return fields;
};

export const getReport = (reportName, printer) => {
  const template = reportTemplates[reportName];

  const buildReport = (data) => {
    const fields = getFields(template);
    let report = template;
    fields.forEach((field) => {
      const [pfield, key] = field;
      const tokens = key.split(/\./);
      let value;
      tokens.forEach((token) => {
        value = value ? value[token] : data[token];
      });
      const fieldRe = new RegExp("\\" + pfield, "ig");
      if (value) {
        report = report.replace(fieldRe, value);
      }
    });
    return report;
  };

  return {
    template,
    print: (data) => {
      const report = buildReport(data);
      return NativeModules.RNZebraBluetoothPrinter.print(printer.address, report);
    },
  };
};

export const getFormats = () => {
  return reportTemplates.formats;
};
