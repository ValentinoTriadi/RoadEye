type LocationData = {
  provinces: Provinsi[];
};

type Provinsi = {
  name: string;
  cities: Kota[];
};

type Kota = {
  name: string;
  districts: Kecamatan[];
};

type Kecamatan = {
  name: string;
};

// Dummy data
const dummyLocationData: LocationData = {
  provinces: [
    {
      name: "Jawa Barat",
      cities: [
        {
          name: "Bandung",
          districts: [
            { name: "Regol" },
            { name: "Lengkong" },
            { name: "Cicendo" },
            // ...districts in Bandung
          ],
        },
        {
          name: "Bogor",
          districts: [
            { name: "Bogor Selatan" },
            { name: "Bogor Utara" },
            { name: "Bogor Tengah" },
            // ...districts in Bogor
          ],
        },
        // ...cities in Jawa Barat
      ],
    },
    {
      name: "Jawa Timur",
      cities: [
        {
          name: "Surabaya",
          districts: [
            { name: "Gubeng" },
            { name: "Sukolilo" },
            { name: "Wonokromo" },
            // ...districts in Surabaya
          ],
        },
        {
          name: "Malang",
          districts: [
            { name: "Klojen" },
            { name: "Lowokwaru" },
            { name: "Blimbing" },
          ],
        },
      ],
    },
  ],
};

export default dummyLocationData;
export type { LocationData, Provinsi, Kota, Kecamatan };
