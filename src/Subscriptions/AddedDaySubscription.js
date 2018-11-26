import gql from "graphql-tag";

export default gql`
subscription addedDay {
    addedDay {
        id
        date
    }
}
`;