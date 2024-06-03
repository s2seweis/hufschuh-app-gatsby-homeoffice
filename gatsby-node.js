const { createRemoteFileNode } = require("gatsby-source-filesystem");

// exports.createSchemaCustomization = ({ actions }) => {
//   const { createTypes } = actions;
//   const typeDefs = `
//     type StrapiSteckbriefAllgemeines implements Node {
//       imageFile: File
//     }
//   `;
//   createTypes(typeDefs);
// };

// exports.createResolvers = ({
//   actions,
//   cache,
//   createNodeId,
//   createResolvers,
//   store,
//   reporter,
// }) => {
//   const { createNode } = actions;
//
//   const template = {
//     imageFile: {
//       type: `File`,
//       resolve(source, args, context, info) {
//         console.log(source, actions, cache, store, reporter);
//         console.log("URL:", `http://localhost:8000${source.url}`);
//         return createRemoteFileNode({
//           url: `https://equilandoo.de/api${source.url}`, // for S3 upload. For local: `http://localhost:1337${source.url}`,
//           store,
//           cache,
//           createNode,
//           createNodeId,
//           reporter,
//         });
//       },
//     },
//   };
//
//   createResolvers({
//     StrapiSteckbriefAllgemeinesHufformBild1: template,
//     StrapiSteckbriefAllgemeinesHufformBild2: template,
//     StrapiSteckbriefAllgemeinesHufformBild3: template,
//   });
// };

// TODO can / must (?) remove domain from url

// exports.onCreateNode = ({ node, actions, createNodeId, getCache }) => {
//     const { createNode, createNodeField } = actions;
//     // Transform the new node here and create a new node or
//     // create a new node field.
//
//     if (node.internal.owner !== "gatsby-source-strapi") return;
//
//     console.log(node);
//     console.log("*******************************");
//     console.log(typeof node);
//     console.log("CNI", createNodeId);
//
//     let fileNode;
//
//     if (node && node.Hufform && node.Hufform.Bild1) {
//         console.log("FOUND!");
//         console.log(node.Hufform.Bild1);
//         const source = node.Hufform.Bild1.url;
//         fileNode = createRemoteFileNode({
//             url: `https://equilandoo.de/api${source}`, // for S3 upload. For local: `http://localhost:1337${source.url}`,
//             // store,
//             getCache,
//             createNode,
//             createNodeId,
//             parentNodeId: node.id,
//             // reporter,
//         });
//
//         node.localFile = fileNode
//         node.imageFile = fileNode.id
//
//
//     }
// };

/*exports.onCreateNode = async ({
  node,
  actions,
  store,
  cache,
  createNodeId,
}) => {
  const { createNode } = actions;
  // console.log("__________________________")
  // console.log(node.__type);
};
exports.downloadMediaFiles = ({
  nodes,
  getCache,
  createNode,
  createNodeId,
  _auth,
}) => {
  console.log("__________________________")
  console.log(nodes)
  nodes.map(async (node) => {
    let fileNode;
    console.log("*****************************")
    console.log(node.__type)
    // Ensures we are only processing Media Files
    // `wordpress__wp_media` is the media file type name for WordPress
    if (node.strapiId) {
      try {
        fileNode = await createRemoteFileNode({
          url: node.source_url,
          // store,
          // cache,
          createNode,
          createNodeId,
          // reporter,
        });
      } catch (e) {
        // Ignore
      }
    }
    // Adds a field `localFile` to the node
    // ___NODE appendix tells Gatsby that this field will link to another node
    if (fileNode) {
      node.localFile___NODE = fileNode.id;
    }
  });
};*/
