import gql from "graphql-tag";

export default gql`
subscription addedEvent($dayID: String) {
    addedEvent(dayID: $dayID) {
        id
        title
        time
        location
        description
    }
}
`;