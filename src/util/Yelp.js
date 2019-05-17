const apikey = process.env.REACT_APP_apikey;

export const Yelp = {
  search(term, location, sortBy) {
    return fetch(
      `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
      { headers: { Authorization: `Bearer ${apikey}` } }
    )
      .then(response => response.json())
      .then(jsonResponse => {
        return jsonResponse.businesses
          ? jsonResponse.businesses.map(business => ({
              id: business.id,
              imageSrc: business.image_url,
              name: business.name,
              address: business.location.address1,
              city: business.location.city,
              state: business.state,
              zipCode: business.zip_code,
              category: business.categories[0] && business.categories[0].title,
              rating: business.rating,
              reviewCount: business.review_count
            }))
          : "";
      });
  }
};
