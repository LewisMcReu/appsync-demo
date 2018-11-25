import gql from "graphql-tag";

export default gql`
subscription updatedEvent($id: String) {
    updatedEvent(id: $id) {
        id
        title
        time
        location
        description
    }
}
`;