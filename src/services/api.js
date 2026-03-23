import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://api.liteapi.travel/v3.0',
  headers: {
    'X-API-Key': import.meta.env.VITE_LITE_API_KEY,
    'Content-Type': 'application/json',
  },
})

// ─── Data Normalization ───────────────────────────────────────────────────────
export function normalizeListing(raw) {
  const images = raw.hotelImages?.map((img) => img.url).filter(Boolean) ?? []

  return {
    id: String(raw.id ?? raw.hotelId),
    name: raw.name ?? 'Unnamed Property',
    city: raw.city ?? 'Unknown Location',
    lat: raw.location?.latitude ?? 0,
    lng: raw.location?.longitude ?? 0,
    imageUrl: images[0] ?? 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
    images,
    hostName: raw.name ?? 'Host',
    hostAvatar: '',
    isSuperhost: raw.starRating >= 4,
    capacity: raw.maxOccupancy ?? 2,
    bedrooms: raw.rooms?.length ?? 1,
    bathrooms: 1,
    beds: 1,
    roomType: raw.accommodation_type ?? 'Hotel',
    pricePerNight: raw.price ?? 0,
    currency: raw.currency ?? 'USD',
    rating: raw.rating ?? raw.starRating ?? 4.0,
    reviewCount: raw.reviewCount ?? 0,
    amenities: raw.hotelFacilities?.map((f) => f.name ?? f).filter(Boolean) ?? [],
    description: raw.hotelDescription ?? '',
  }
}

// ─── Fetch Hotels ─────────────────────────────────────────────────────────────
export async function fetchListings({ placeId }) {
  const { data } = await apiClient.get('/data/hotels', {
    params: {
      countryCode: 'US',
      cityName: placeId,
      limit: 20,
    },
  })

  const results = data?.data ?? []
  return results.map(normalizeListing)
}

// ─── Fetch Single Hotel ───────────────────────────────────────────────────────
export async function fetchListingById(id) {
  const { data } = await apiClient.get('/data/hotel', {
    params: { hotelId: id },
  })

  const raw = data?.data ?? {}
  return normalizeListing({ ...raw, id: raw.id ?? id })
}

export default apiClient


