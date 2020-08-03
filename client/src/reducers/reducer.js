export default function Reducer(state, action)
{
    switch(action.type) {
        case "UPDATE_CONTEXT":
            return {
                ...action.payload
            }
        default:
            return state;
    }
}