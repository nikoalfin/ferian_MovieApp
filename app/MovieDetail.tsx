import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { useRouter, useLocalSearchParams } from 'expo-router';

const API_URL = 'https://api.themoviedb.org/3/movie/popular';
const API_KEY = '71d6aac587a6bd5daa50ac0301d6d271'; // Ganti dengan API Key Anda

export default function DetailMovie() {
  const { movie } = useLocalSearchParams();
  const parsedMovie = movie ? JSON.parse(movie as string) : {};
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  const fetchPopularMovies = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        params: {
          api_key: API_KEY,
          language: 'en-US',
          page: 1,
        },
      });
      setPopularMovies(response.data.results.slice(0, 10)); // Ambil 10 film teratas
    } catch (error) {
      console.error('Error fetching popular movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderPopularItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.popularCard}
      onPress={() =>
        router.push({ pathname: '/MovieDetail', params: { movie: JSON.stringify(item) } })
      }
    >
      {item.poster_path && (
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }}
          style={styles.popularImage}
        />
      )}
      <Text style={styles.popularTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Detail film utama */}
      <Text style={styles.header}>Detail Film</Text>
      {parsedMovie.poster_path && (
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500/${parsedMovie.poster_path}` }}
          style={styles.image}
        />
      )}
      <Text style={styles.title}>{parsedMovie.title}</Text>
      <Text style={styles.author}>Release Date: {parsedMovie.release_date || 'Unknown'}</Text>
      <Text style={styles.content}>{parsedMovie.overview || 'No description available.'}</Text>

      {/* Film Populer */}
      <Text style={styles.sectionHeader}>Film Populer</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={popularMovies}
          renderItem={renderPopularItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.popularContainer}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D1D1D',
    padding: 10,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingBottom: 5,
    color: '#fff',
    marginBottom: 5,
  },
  image: {
    height: 400,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  author: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#fff',
  },
  // Section Header
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
    color: '#fff',
  },
  // Popular Movies Styles
  popularContainer: {
    paddingBottom: 10,
  },
  popularCard: {
    backgroundColor: '#434343',
    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
    width: 250,
  },
  popularImage: {
    height: 200,
    borderRadius: 10,
    marginBottom: 5,
  },
  popularTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    color: '#fff',
  },
});
