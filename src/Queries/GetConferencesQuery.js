import gql from "graphql-tag";

export default gql`
query getConferences {
    getConferences {
        id
        name
        startDate
        endDate
    }
}
`;