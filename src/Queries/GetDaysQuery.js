import gql from "graphql-tag";

export default gql`
query getDays($conferenceID: ID) {
    getDays(conferenceID: $conferenceID){
        id
        date
    }
}
`;