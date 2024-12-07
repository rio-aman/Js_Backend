require('dotenv').config()

const express = require('express')
const app = express()
const port = 3000

const githubdata = {
    "login": "rio-aman",
    "id": 130999468,
    "node_id": "U_kgDOB87krA",
    "avatar_url": "https://avatars.githubusercontent.com/u/130999468?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/rio-aman",
    "html_url": "https://github.com/rio-aman",
    "followers_url": "https://api.github.com/users/rio-aman/followers",
    "following_url": "https://api.github.com/users/rio-aman/following{/other_user}",
    "gists_url": "https://api.github.com/users/rio-aman/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/rio-aman/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/rio-aman/subscriptions",
    "organizations_url": "https://api.github.com/users/rio-aman/orgs",
    "repos_url": "https://api.github.com/users/rio-aman/repos",
    "events_url": "https://api.github.com/users/rio-aman/events{/privacy}",
    "received_events_url": "https://api.github.com/users/rio-aman/received_events",
    "type": "User",
    "user_view_type": "public",
    "site_admin": false,
    "name": "AmanPrajapati",
    "company": null,
    "blog": "",
    "location": null,
    "email": null,
    "hireable": null,
    "bio": null,
    "twitter_username": null,
    "public_repos": 6,
    "public_gists": 0,
    "followers": 0,
    "following": 1,
    "created_at": "2023-04-17T13:39:06Z",
    "updated_at": "2024-10-29T05:59:37Z"
  }

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/twitter', (req,res) => {
    res.send("Aman Prajapati")
})
app.get('/login', (req,res) => {
    res.send("<h1>please login in app</h1>")
})

app.get('/github', (req,res) => {
    res.json(githubdata)
})

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${port}`)
})

// if we want to get this exact app with port then we need to use dotenv 

// well above is a basic server
//  slash / this is must in app.get 

