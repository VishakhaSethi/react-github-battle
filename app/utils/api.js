import axios from 'axios';

const id = 'YOUR_CLIENT_ID';
const sec = 'YOUR_SECRET_ID';
const params = '?client_id=' + id + '&client_secret=' + sec;

const getProfile = (username) => {
  return axios.get('https://api.github.com/users/' + username + params)
    .then((user) =>{
        return user.data;
    })
}

const getRepos = (username) => {
  return axios.get('https://api.github.com/users/' + username + '/repos' + params + '&per_page=100')
}

const getStarCount = (repos) => {
  return repos.data.reduce((count, repo) => count + repo.stargazers_count, 0)
}

const calculateScore = (profile, repos) => {
  const followers = profile.followers;
  const totalStars = getStarCount(repos);
  return (followers * 3) + totalStars;
}

const handleError = (error) => {
  console.warn(error);
  return null;
}

const getUserData = (player) => {
  return axios.all([
    getProfile(player),
    getRepos(player)
    ]).then((data) => {
     const profile = data[0];
     const repos = data[1];
   
     return {
       profile: profile,
       score: calculateScore(profile, repos)
     }
  })
}


const sortPlayers = (players) =>
   players.sort((a,b) => b.score - a.score);



module.exports = {
  battle: function(players) {
    return  axios.all(players.map(getUserData)) 
      .then(sortPlayers)
      .catch(handleError)
  },

  fetchPopularRepos: function(language) {
    var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');

  return axios.get(encodedURI)
    .then((response) => 
       response.data.items
    )
  }
}