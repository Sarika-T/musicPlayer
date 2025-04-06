const musicData = [
    {
      id: 1,
      title: "Eternal Echoes",
      thumbnail: "data:image/jpeg;base64,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",
      musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      duration: "3:45",
      artistName: "Luna Waves"
    },
    {
      id: 2,
      title: "Celestial Dreams",
      thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5WucV1WliAnUCyKN8f2G9rGpHlYREGMk3AQ&s",
      musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      duration: "4:10",
      artistName: "Nova Night"
    },
    {
        id: 3,
        title: "Bad Dreams",
        thumbnail: "data:image/jpeg;base64,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",
        musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        duration: "4:10",
        artistName: "Teddy Swims"
    },
    {
        id: 4,
        title: "Sugar",
        thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ94dvqgh60H5-feWQgb_UCOF6wW85laGCrRg&s",
        musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        duration: "4:10",
        artistName: "Maroon 5"
    },
    {
        id: 5,
        title: "Perfect",
        thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbQjv-VVvoUhJmLht-MVGDP5jvR1EJov_9GQ&s",
        musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        duration: "4:10",
        artistName: "Ed Sheeran"
    },
    {
        id: 6,
        title: "Black Space",
        thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjOUPVHKoj8IGNKGNX1Uif8eRfFViWosYkFA&s",
        musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        duration: "4:10",
        artistName: "Taylor Swift"
    },
    {
        id: 7,
        title: "Rolling in the Deep",
        thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIJGwsob5ZlbXyXMpcF6H4Xt9UV0T1LNQwuA&s",
        musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        duration: "4:10",
        artistName: "Adedo"
    },
    {
        id: 8,
        title: "Numb",
        thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvNP0A26WuQLnsrqZJYp-Q6GlYBVo1bOovHw&s",
        musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        duration: "4:10",
        artistName: "Linkin Park"
    },
    {
        id: 9,
        title: "Thunder",
        thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZYvYlhawXjiwC6iggCNZmM4b20q1sc3p7tA&s",
        musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        duration: "4:10",
        artistName: "Imagine Dreams"
    },
    {
        id: 10,
        title: "Animals",
        thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBMilJfz74DtctuK0DukzOrt-TdHyB5Kc00g&s",
        musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        duration: "4:10",
        artistName: "Martin Garix"
    },
  ];
  
  export default musicData;
  