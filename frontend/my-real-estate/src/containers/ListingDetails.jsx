import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const ListingDetail = () => {
  const [listing, setListing] = useState({});
  const [realtor, setRealtor] = useState({});
  const [price, setPrice] = useState(0);
  const { id } = useParams();

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios
      .get(`http://localhost:8000/api/listings/${id}`, config)
      .then((res) => {
        setListing(res.data);
        setPrice(numberWithCommas(res.data.price));
      })
      .catch((err) => {});
  }, [id]);

  useEffect(() => {
    const realtorId = listing.realtor;

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    if (realtorId) {
      axios
        .get(`http://localhost:8000/api/realtors/${realtorId}`, config)
        .then((res) => {
          setRealtor(res.data);
        })
        .catch((err) => {});
    }
  }, [listing.realtor]);

  const displayInteriorImages = () => {
    const images = [];
    const photos = Array.from(
      { length: 20 },
      (_, i) => listing[`photo_${i + 1}`]
    );

    for (let i = 0; i < photos.length; i += 3) {
      images.push(
        <div key={i} className="row">
          {photos.slice(i, i + 3).map((photo, index) =>
            photo ? (
              <div key={index} className="col-1-of-3">
                <div className="listingdetail__display">
                  <img
                    className="listingdetail__display__image"
                    src={photo}
                    alt=""
                  />
                </div>
              </div>
            ) : null
          )}
        </div>
      );
    }

    return images;
  };

  return (
    <div className="listingdetail">
      <Helmet>
        <title>{`Real Estate - Listing | ${listing.title || ""}`}</title>
        <meta name="description" content="Listing detail" />
      </Helmet>
      <div className="listingdetail__header">
        <h1 className="listingdetail__title">{listing.title}</h1>
        <p className="listingdetail__location">
          {listing.city}, {listing.county}, {listing.zipcode}
        </p>
      </div>
      <div className="row">
        <div className="listingdetail__breadcrumb">
          <Link className="listingdetail__breadcrumb__link" to="/">
            Home
          </Link>{" "}
          / {listing.title}
        </div>
      </div>
      <div className="row">
        <div className="col-3-of-4">
          <div className="listingdetail__display">
            <img
              className="listingdetail__display__image"
              src={listing.photo_main}
              alt=""
            />
          </div>
        </div>
        <div className="col-1-of-4">
          <div className="listingdetail__display">
            <img
              className="listingdetail__display__image"
              src={realtor.photo}
              alt=""
            />
          </div>
          <h3 className="listingdetail__realtor">{realtor.name}</h3>
          <p className="listingdetail__contact">{realtor.phone}</p>
          <p className="listingdetail__contact">{realtor.email}</p>
          <p className="listingdetail__about">{realtor.description}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-1-of-2">
          <ul className="listingdetail__list">
            <li className="listingdetail__list__item">
              Home Type: {listing.home_type}
            </li>
            <li className="listingdetail__list__item">Price: Ksh {price}</li>
            <li className="listingdetail__list__item">
              Bedrooms: {listing.bedrooms}
            </li>
            <li className="listingdetail__list__item">
              Bathrooms: {listing.bathrooms}
            </li>
            <li className="listingdetail__list__item">
              Square Feet: {listing.sqft}
            </li>
          </ul>
        </div>
        <div className="col-1-of-2">
          <ul className="listingdetail__list">
            <li className="listingdetail__list__item">
              Sale Type: {listing.sale_type}
            </li>
            <li className="listingdetail__list__item">
              Address: {listing.address}
            </li>
            <li className="listingdetail__list__item">City: {listing.city}</li>
            <li className="listingdetail__list__item">
              County: {listing.county}
            </li>
            <li className="listingdetail__list__item">
              Zipcode: {listing.zipcode}
            </li>
          </ul>
        </div>
      </div>
      <div className="row">
        <p className="listingdetail__description">{listing.description}</p>
      </div>
      {displayInteriorImages()}
    </div>
  );
};

export default ListingDetail;
