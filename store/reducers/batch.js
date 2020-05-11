import {
  SET_BATCHES,
  SET_BATCH,
  UPDATE_BATCH,
  SET_STUBOUT,
  UPDATE_STUBOUT,
} from "../actions/batch";

const initialState = {
  batches: [],
  stubouts: [],
  batch: null,
  stubout: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BATCHES:
      return { ...state, batches: action.batches };
      break;

    case SET_BATCH:
      return { ...state, batch: action.batch, stubouts: action.stubouts };
      break;

    case UPDATE_BATCH:
      const updatedBatchIdx = state.batches.findIndex(
        (item) => item.objid === action.batch.objid
      );
      const updatedBatches = [...state.batches];
      updatedBatches[updatedBatchIdx] = action.batch;
      return { ...state, batches: updatedBatches, batch: action.batch };
      break;

    case SET_STUBOUT:
      return { ...state, stubout: action.stubout };
      break;

    case UPDATE_STUBOUT:
      const updatedStuboutIdx = state.stubouts.findIndex(
        (item) => item.objid === action.stubout.objid
      );
      const updatedStubouts = [...state.stubouts];
      updatedStubouts[updatedStuboutIdx] = action.stubout;
      return { ...state, stubouts: updatedStubouts, stubout: action.stubout };
      break;

    default:
      return state;
  }
};
