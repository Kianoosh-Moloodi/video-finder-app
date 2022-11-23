import './App.css';
import youtube from './api/youtube';
import { Grid } from '@mui/material';
import SearchBar from './components/SearchBar';
import VideoDetail from './components/VideoDetail';
import VideoList from './components/VideoList';
import { useState } from 'react';

function App() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideos] = useState({ id: {}, snippet: {} });
  return (
    <Grid style={{ justifyContent: 'center' }} container spacing={10}>
      <Grid item xs={11}>
        <Grid container spacing={10}>
          <Grid item xs={12}>
            <SearchBar onSubmit={handleSubmit} />
          </Grid>
          <Grid item xs={8}>
            <VideoDetail video={selectedVideo} />
          </Grid>
          <Grid item xs={4}>
            <VideoList videos={videos} onVideoSelect={setSelectedVideos} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
  async function handleSubmit(searchItem) {
    const {
      data: { items: videos },
    } = await youtube.get('search', {
      params: {
        part: 'snippet',
        maxResults: 5,
        // key: 'ENTER YOUR GOOGLE YOUTUBE V3 API KEY HERE', *************** IMPORTANT ***************
        q: searchItem,
      },
    });
    setVideos(videos);
    setSelectedVideos(videos[0]);
  }
}

export default App;
