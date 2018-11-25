import gql from "graphql-tag";

export default gql`
subscription addedDay($conferenceID: String) {
    addedDay(conferenceID: $conferenceID) {
        id
        date
    }
}
`;