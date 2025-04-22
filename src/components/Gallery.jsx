import React, { useEffect, useState } from "react";
import { fetchPhotos } from "../api/photonApi";
import "./Gallery.css";

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(() => {
    const savedPage = localStorage.getItem("galleryPage");
    return savedPage ? parseInt(savedPage, 10) : 1;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("galleryPage", page);
    setLoading(true);
    fetchPhotos(page, 4)
      .then((data) => setPhotos(data))
      .finally(() => setLoading(false));
  }, [page]);

  const handleNext = () => setPage((prev) => prev + 1);
  const handlePrev = () => setPage((prev) => Math.max(1, prev - 1));

  return (
    <div className="container">
      {loading && <p className="loading-text">Завантаження...</p>}

      <div className="card-list">
        {!loading &&
          photos.map((photo) => (
            <div key={photo.id} className="card">
              <img src={photo.download_url} alt={photo.author} className="card-image" />
              <div className="card-content">
                <p>
                  <strong>{photo.author}</strong>
                </p>
              </div>
            </div>
          ))}
      </div>

      <div>
        <button onClick={handlePrev} disabled={page === 1}>
          Попередні
        </button>
        <span className="page-indicator">Сторінка: {page}</span>
        <button onClick={handleNext}>Наступні</button>
      </div>
    </div>
  );
};

export default Gallery;
