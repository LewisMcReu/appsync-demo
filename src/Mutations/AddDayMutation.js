import gql from "graphql-tag";

export default gql`
mutation addDay($conferenceID: ID!, $date: AWSDate!) {
    addDay(conferenceID: $conferenceID, date: $date) {
        id
        date
        conference {
            id
        }
    }
}
`;