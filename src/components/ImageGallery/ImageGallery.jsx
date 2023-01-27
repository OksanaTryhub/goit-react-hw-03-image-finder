import { Component } from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';

import styles from './ImageGallery.module.scss';

const KEY = '31931321-46b396f059afa63f80e004304';
const URL = 'https://pixabay.com/api/';
// https://pixabay.com/api/?key=31931321-46b396f059afa63f80e004304&q=yellow+flowers&image_type=photo

// export async function fetchImages(name, page, per_page) {
//   try {
//     const response = await axios.get(
//       `${URL}?key=${KEY}&q=${name}&page=${page}&per_page=${per_page}&image_type=photo&orientation=horizontal&safesearch=true`
//     );
//     return response;
//   } catch (error) {
//     console.error(error);
//   }
// }

// {
//   webformatURL,
//   largeImageURL,
//   id,
// }

class ImageGallery extends Component {
  state = {
    images: [],
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get(`${URL}?key=${KEY}&q=yellow+flowers&image_type=photo`)
      .then(({ data }) => {
        this.setState({ images: data.hits });
      })
      .catch(error => {
        console.log(error.message);
      })
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    const { images, loading } = this.state;
    const ImageGalleryItem = images.map(
      ({ id, webformatURL, largeImageURL }) => (
        <li key={id} className={styles.imageGalleryItem}>
          <img
            className={styles.imageGalleryItem__image}
            src={webformatURL}
            alt=""
          />
        </li>
      )
    );
    return (
      <>
        <header className={styles.searchbar}>
          <form className={styles.searchForm}>
            <button type="submit" className={styles.searchForm__button}>
              <span className={styles.searchForm__buttonLabel}>Search</span>
            </button>

            <input
              className={styles.searchForm__input}
              type="text"
              autocomplete="off"
              autofocus
              placeholder="Search images and photos"
            />
          </form>
        </header>
        {loading && (
          <div className={styles.loader}>
            <span></span>
            <span></span>
          </div>
        )}
        <ul className={styles.imageGallery}>{ImageGalleryItem}</ul>
      </>
    );
  }
}

export default ImageGallery;
