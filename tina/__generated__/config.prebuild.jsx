// tina/config.ts
import { defineConfig } from "tinacms";
var postFields = [
  {
    type: "string",
    name: "title",
    label: "Title",
    isTitle: true,
    required: true
  },
  {
    type: "datetime",
    name: "date",
    label: "Publish date"
  },
  {
    type: "boolean",
    name: "draft",
    label: "Draft"
  },
  {
    type: "string",
    name: "description",
    label: "Description",
    ui: { component: "textarea" }
  },
  {
    type: "string",
    name: "excerpt",
    label: "Excerpt",
    ui: { component: "textarea" }
  },
  {
    type: "string",
    name: "slug",
    label: "Slug"
  },
  {
    type: "string",
    name: "permalink",
    label: "Permalink",
    description: "Optional custom URL, starting with a slash."
  },
  {
    type: "string",
    name: "tags",
    label: "Tags",
    list: true
  },
  {
    type: "string",
    name: "categories",
    label: "Categories",
    list: true
  },
  {
    type: "string",
    name: "keywords",
    label: "Keywords",
    list: true
  },
  {
    type: "boolean",
    name: "comments",
    label: "Enable comments"
  },
  {
    type: "boolean",
    name: "showToc",
    label: "Show table of contents"
  },
  {
    type: "rich-text",
    name: "body",
    label: "Post content",
    isBody: true
  }
];
var sections = [
  ["research", "Research"],
  ["philosophy", "Philosophy"],
  ["opinions", "Opinions"],
  ["miscellaneous", "Miscellaneous"]
];
var collections = sections.map(([name, label]) => ({
  name,
  label,
  path: `content/${name}`,
  format: "md",
  fields: postFields
}));
var config_default = defineConfig({
  branch: process.env.TINA_BRANCH || process.env.HEAD || "main",
  clientId: process.env.TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,
  build: {
    outputFolder: "admin",
    publicFolder: "static"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "static/images"
    }
  },
  schema: {
    collections
  }
});
export {
  config_default as default
};
