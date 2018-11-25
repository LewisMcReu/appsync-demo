import gql from "graphql-tag";

export default gql`
query getEvents($dayID: ID) {
    getEvents(dayID: $dayID){
        id
        title
        time
        location
        description
    }
}
`;