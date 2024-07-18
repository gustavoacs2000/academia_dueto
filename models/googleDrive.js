import {google} from 'googleapis';

const apiKey = process.env.PORT

const blogger = google.blogger_v3({
  version: 'v3',
  auth: apiKey // specify your API key here
});

const params = {
  blogId: '3213900'
};

async function main(params) {
  const res = await blogger.blogs.get({blogId: params.blogId});
  console.log(`${res.data.name} has ${res.data.posts.totalItems} posts! The blog url is ${res.data.url}`)
};

main().catch(console.error);