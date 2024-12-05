import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';


const API_KEY = '71d6aac587a6bd5daa50ac0301d6d271'; 
const API_URL = 'https://api.themoviedb.org/3/movie/popular';




export default function MovieScreen() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState('Action');
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchMovies(selectedGenre);
  }, [selectedGenre]);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredMovies(movies);
    } else {
      const filteredData = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMovies(filteredData);
    }
  }, [searchQuery, movies]);

  const fetchMovies = async (genre: string) => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        params: {
          api_key: API_KEY,
          language: 'en-US',
        },
      });
      setMovies(response.data.results);
      setFilteredMovies(response.data.results); 
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push({ pathname: '/MovieDetail', params: { movie: JSON.stringify(item) } })}
    >
      {item.poster_path && (
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
          style={styles.image}
        />
      )}
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.overview.slice(0, 100)}...</Text>
    </TouchableOpacity>
  );



  return (
    <View style={styles.container}>

      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholderTextColor="#fff"
        placeholder="Search Movies"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Text style={styles.subHeader}>Popular Movies</Text>

   
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={filteredMovies}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          numColumns={2}  // Menampilkan dua kolom
          contentContainerStyle={styles.articlesContainer}
          showsVerticalScrollIndicator={true}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D1D1D',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width:"100%"
  },
  subHeader: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
    width:"100%"
  },
  searchInput: {
    height: 40,
    width: 400,
    borderColor: '#fff',
    backgroundColor:'#434343',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 15,
    marginBottom: 10,
    marginTop:10,
    tintColor: '#fff',
    color: '#fff',
    
  },
  card: {
    backgroundColor: '#434343',
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
    padding: 10,
    width: '48%', // Membatasi lebar agar dua card berada di satu baris
    marginHorizontal: '1%', // Memberikan jarak antara card
  },
  image: {
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color:'#fff'
  },
  description: {
    fontSize: 14,
    color: '#fff',
  },
  // Category styles
  categoriesContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  categoryButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    height: 35,
  },
  selectedCategory: {
    backgroundColor: '#EC3636',
    height: 35,
  },
  categoryText: {
    fontSize: 14,
    color: '#000',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  articlesContainer: {
    marginTop: 10,
    width: '100%',
    
      
  },
});
