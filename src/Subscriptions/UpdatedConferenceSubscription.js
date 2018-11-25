import gql from "graphql-tag";

export default gql `
subscription updatedConference($id: String) {
    updatedConference(id: $id) {
        id
        name
        startDate
        endDate
    }
}
`;