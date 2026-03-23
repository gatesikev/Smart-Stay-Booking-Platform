import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://airbnb19.p.rapidapi.com',
  headers: {
    'x-rapidapi-key': import.meta.env.VITE_RAPID_API_KEY,
    'x-rapidapi-host': 'airbnb19.p.rapidapi.com',
    'Content-Type': 'application/json',
  },
})

export function normalizeListing(raw) {
  const images = []
  if (raw.photos?.length) {
    raw.photos.forEach((p) => {
      if (p.xl_picture || p.picture) images.push(p.xl_picture || p.picture)
    })
  }
  if (!images.length && raw.xl_picture_url) images.push(raw.xl_picture_url)
  if (!images.length && raw.picture_url?.picture) images.push(raw.picture_url.picture)

  return {
    id: String(raw.id),
    name: raw.name ?? 'Unnamed Property',
    city: raw.city ?? 'Unknown Location',
    lat: raw.lat ?? 0,
    lng: raw.lng ?? 0,
    imageUrl: images[0] ?? 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
    images,
    hostName: raw.primary_host?.first_name ?? 'Host',
    hostAvatar: raw.primary_host?.picture_url ?? '',
    isSuperhost: raw.primary_host?.is_superhost ?? false,
    capacity: raw.person_capacity ?? 2,
    bedrooms: raw.bedrooms ?? 1,
    bathrooms: raw.bathrooms ?? 1,
    beds: raw.beds ?? 1,
    roomType: raw.room_type ?? 'Entire place',
    pricePerNight: raw.price?.rate?.amount ?? 0,
    currency: raw.price?.rate?.currency ?? 'USD',
    rating: raw.avg_rating ?? 4.5,
    reviewCount: raw.reviews_count ?? 0,
    amenities: raw.amenities?.map((a) => a.name).filter(Boolean) ?? [],
    description: raw.space ?? raw.description ?? raw.neighborhood_overview ?? '',
  }
}

export async function fetchListings({ placeId, checkin, checkout, adults }) {
  const { data } = await apiClient.get('/api/v2/searchPropertyByPlaceId', {
    params: {
      placeId,
      ...(checkin && { checkin }),
      ...(checkout && { checkout }),
      ...(adults && { adults }),
    },
  })

  const results =
    data?.data?.list?.map((item) => item.listing).filter(Boolean) ?? []

  return results.map(normalizeListing)
}

export async function fetchListingById(id) {
  const { data } = await apiClient.get('/api/v2/getPropertyDetails', {
    params: { id },
  })

  const raw = data?.data?.listing ?? data?.data ?? {}
  return normalizeListing({ ...raw, id: raw.id ?? id })
}

export default apiClient