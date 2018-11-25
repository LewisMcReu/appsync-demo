import gql from "graphql-tag";

export default gql`
mutation addEvent($dayID: ID!, $title: String!, $time: AWSTime!, $description: String, $location: String) {
    addEvent(dayID: $dayID, title: $title, time: $time, description: $description, location: $location) {
        id
        title
        time
        description
        location
        day {
            id
        }
    }
}
`;