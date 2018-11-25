import gql from "graphql-tag";

export default gql `
subscription addedConference {
    addedConference {
        id
        name
        startDate
        endDate
    }
}
`;