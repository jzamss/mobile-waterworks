class Rate {
    constructor(rulename, params, condition, action, salience) {
        this.rulename = rulename;
        this.params = params;
        this.condition = condition;
        this.action = action;
        this.salience = salience;
    }

    get _serializer() {
        return {
            params: (value) => value ? value.join(', ') : ''
        }
    }

    get _deserializer() {
        return {
            params: (value) => value.trim().split(/[ ]*,[ ]*/),
        }
    }
}

export default Rate