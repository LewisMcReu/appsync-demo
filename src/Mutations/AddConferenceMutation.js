import gql from "graphql-tag";

export default gql`
mutation addConference($name: String!, $startDate: AWSDate!, $endDate: AWSDate!) {
    addConference(name: $name, startDate: $startDate, endDate: $endDate) {
        id
        name
        startDate
        endDate
    }
}
`;