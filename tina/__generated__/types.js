export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const ResearchPartsFragmentDoc = gql`
    fragment ResearchParts on Research {
  __typename
  title
  date
  draft
  description
  excerpt
  slug
  permalink
  tags
  categories
  keywords
  comments
  showToc
  body
}
    `;
export const PhilosophyPartsFragmentDoc = gql`
    fragment PhilosophyParts on Philosophy {
  __typename
  title
  date
  draft
  description
  excerpt
  slug
  permalink
  tags
  categories
  keywords
  comments
  showToc
  body
}
    `;
export const OpinionsPartsFragmentDoc = gql`
    fragment OpinionsParts on Opinions {
  __typename
  title
  date
  draft
  description
  excerpt
  slug
  permalink
  tags
  categories
  keywords
  comments
  showToc
  body
}
    `;
export const MiscellaneousPartsFragmentDoc = gql`
    fragment MiscellaneousParts on Miscellaneous {
  __typename
  title
  date
  draft
  description
  excerpt
  slug
  permalink
  tags
  categories
  keywords
  comments
  showToc
  body
}
    `;
export const ResearchDocument = gql`
    query research($relativePath: String!) {
  research(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ResearchParts
  }
}
    ${ResearchPartsFragmentDoc}`;
export const ResearchConnectionDocument = gql`
    query researchConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ResearchFilter) {
  researchConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ResearchParts
      }
    }
  }
}
    ${ResearchPartsFragmentDoc}`;
export const PhilosophyDocument = gql`
    query philosophy($relativePath: String!) {
  philosophy(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PhilosophyParts
  }
}
    ${PhilosophyPartsFragmentDoc}`;
export const PhilosophyConnectionDocument = gql`
    query philosophyConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PhilosophyFilter) {
  philosophyConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PhilosophyParts
      }
    }
  }
}
    ${PhilosophyPartsFragmentDoc}`;
export const OpinionsDocument = gql`
    query opinions($relativePath: String!) {
  opinions(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...OpinionsParts
  }
}
    ${OpinionsPartsFragmentDoc}`;
export const OpinionsConnectionDocument = gql`
    query opinionsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: OpinionsFilter) {
  opinionsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...OpinionsParts
      }
    }
  }
}
    ${OpinionsPartsFragmentDoc}`;
export const MiscellaneousDocument = gql`
    query miscellaneous($relativePath: String!) {
  miscellaneous(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...MiscellaneousParts
  }
}
    ${MiscellaneousPartsFragmentDoc}`;
export const MiscellaneousConnectionDocument = gql`
    query miscellaneousConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: MiscellaneousFilter) {
  miscellaneousConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...MiscellaneousParts
      }
    }
  }
}
    ${MiscellaneousPartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    research(variables, options) {
      return requester(ResearchDocument, variables, options);
    },
    researchConnection(variables, options) {
      return requester(ResearchConnectionDocument, variables, options);
    },
    philosophy(variables, options) {
      return requester(PhilosophyDocument, variables, options);
    },
    philosophyConnection(variables, options) {
      return requester(PhilosophyConnectionDocument, variables, options);
    },
    opinions(variables, options) {
      return requester(OpinionsDocument, variables, options);
    },
    opinionsConnection(variables, options) {
      return requester(OpinionsConnectionDocument, variables, options);
    },
    miscellaneous(variables, options) {
      return requester(MiscellaneousDocument, variables, options);
    },
    miscellaneousConnection(variables, options) {
      return requester(MiscellaneousConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "http://localhost:4001/graphql",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
