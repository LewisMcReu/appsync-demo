import gql from "graphql-tag";

export default gql`
subscription addedEvent {
    addedEvent {
        id
        title
        time
        location
        description
        day {
            id
        }
    }
}
`;