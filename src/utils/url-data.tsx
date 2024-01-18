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
  urls: urlData[];
};

type urlData = {
  name: string;
  url: string;
};

const urlDataAll: LocationData = {
  provinces: [
    {
      name: "DKI Jakarta",
      cities: [
        {
          name: "Jakarta Timur",
          districts: [
            {
              name: "6 Tol Dalam Kota (Kelapa Gading-Pulo Gebang)",
              urls: [
                {
                  name: "23+150",
                  url: "https://103.164.218.114/camera/share/tios/2/27/index.m3u8",
                },
                {
                  name: "24+150",
                  url: "https://103.164.218.114/camera/share/tios/2/25/index.m3u8",
                },
                {
                  name: "25+540",
                  url: "https://103.164.218.114/camera/share/tios/2/80/index.m3u8",
                },
                {
                  name: "26+800",
                  url: "https://103.164.218.114/camera/share/tios/2/20/index.m3u8",
                },
                {
                  name: "27+100",
                  url: "https://103.164.218.114/camera/share/tios/2/19/index.m3u8",
                },
                {
                  name: "28+150",
                  url: "https://103.164.218.114/camera/share/tios/1/61/index.m3u8",
                },
              ],
            },
            {
              name: "Bekasi-Cawang-Kampung Melayu",
              urls: [
                {
                  name: "GT Bintara Jaya",
                  url: "https://cctv.kkdm.co.id/api/cctv/3/32/index.m3u8",
                },
                {
                  name: "GT Jaka Sampurna",
                  url: "https://cctv.kkdm.co.id/api/cctv/3/31/index.m3u8",
                },
                {
                  name: "KM 04+000 A",
                  url: "https://cctv.kkdm.co.id/api/cctv/6/20/index.m3u8",
                },
                {
                  name: "KM 05+000 A",
                  url: "https://cctv.kkdm.co.id/api/cctv/6/13/index.m3u8",
                },
              ],
            },
          ],
        },
        {
          name: "Jakarta Utara",
          districts: [
            {
              name: "Akses Tanjung Priok",
              urls: [
                {
                  name: "58+400 A",
                  url: "https://pub.hk-opt.com/LiveApp/streams/687489889091511277827377.m3u8",
                },
                {
                  name: "58+400 B",
                  url: "https://pub.hk-opt.com/LiveApp/streams/501264524429471982550467.m3u8",
                },
                {
                  name: "59+000 A",
                  url: "https://pub.hk-opt.com/LiveApp/streams/095660838019901274554950.m3u8",
                },
                {
                  name: "59+000 B",
                  url: "https://pub.hk-opt.com/LiveApp/streams/956464037412277558025165.m3u8",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Lampung",
      cities: [
        {
          name: "Bakaheuni-Terbanggi Besar",
          districts: [
            {
              name: "BAKTER AKSES LEMATANG A",
              urls: [
                {
                  name: "BAKTER AKSES LEMATANG A",
                  url: "https://cctv.hk-opt.com/LiveApp/streams/usCCmbbiFW111681846032023.m3u8",
                },
              ],
            },
            {
              name: "BAKTER AKSES LEMATANG B",
              urls: [
                {
                  name: "BAKTER AKSES LEMATANG B",
                  url: "https://cctv.hk-opt.com/LiveApp/streams/xpVLOsNANeKA1681846032074.m3u8",
                },
              ],
            },
            {
              name: "BAKTER GB KOTABARU",
              urls: [
                {
                  name: "BAKTER GB KOTABARU",
                  url: "https://cctv.hk-opt.com/LiveApp/streams/ooat7CIl1TC91681846032656.m3u8",
                },
              ],
            },
            {
              name: "BAKTER GB KOTABARU ENTRANCE",
              urls: [
                {
                  name: "BAKTER GB KOTABARU ENTRANCE",
                  url: "https://cctv.hk-opt.com/LiveApp/streams/auWKbId53PbM1681846032709.m3u8",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Sumatera Utara",
      cities: [
        {
          name: "Medan",
          districts: [
            {
              name: "Medan - Binjai",
              urls: [
                {
                  name: "MEBI Akses Helvetia B",
                  url: "http://38.9.131.80:8097/mebi/akseshelvetia-b/akseshelvetia-b.m3u8",
                },
                {
                  name: "MEBI GT BINJAI",
                  url: "http://38.9.131.80:8097/mebi/gt-binjai/gt-binjai.m3u8",
                },
                // ... (add other URLs as needed)
              ],
            },
          ],
        },
        {
          name: "Binjai",
          districts: [
            {
              name: "Medan - Binjai",
              urls: [
                {
                  name: "MEBI Akses Helvetia B",
                  url: "http://38.9.131.80:8097/mebi/akseshelvetia-b/akseshelvetia-b.m3u8",
                },
                {
                  name: "MEBI GT BINJAI",
                  url: "http://38.9.131.80:8097/mebi/gt-binjai/gt-binjai.m3u8",
                },
                // ... (add other URLs as needed)
              ],
            },
          ],
        },
      ],
    },
    {
      name: "Sumatera Selatan",
      cities: [
        {
          name: "Palembang",
          districts: [
            {
              name: "Palembang - Indralaya",
              urls: [
                {
                  name: "01+600 A",
                  url: "https://pub.hk-opt.com/LiveApp/streams/267565493547947969759647.m3u8",
                },
                {
                  name: "01+600 B",
                  url: "https://pub.hk-opt.com/LiveApp/streams/000873119738804749935559.m3u8",
                },
                // ... (add other URLs as needed)
              ],
            },
          ],
        },
        {
          name: "Indralaya",
          districts: [
            {
              name: "Palembang - Indralaya",
              urls: [
                {
                  name: "01+600 A",
                  url: "https://pub.hk-opt.com/LiveApp/streams/267565493547947969759647.m3u8",
                },
                {
                  name: "01+600 B",
                  url: "https://pub.hk-opt.com/LiveApp/streams/000873119738804749935559.m3u8",
                },
                // ... (add other URLs as needed)
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default urlDataAll;
export type { urlData };
