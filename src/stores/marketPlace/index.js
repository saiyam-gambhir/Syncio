import { useConnectionsStore } from 'connections';
import deepmerge from 'deepmerge';

/* ----- Actions ----- */
import { fetchProfile } from './actions/fetchProfile';
import { fetchProfiles } from './actions/fetchProfiles';
import { sendMessage } from './actions/sendMessage';
import { updateProfile } from './actions/updateProfile';

export const useMarketPlaceStore = defineStore('marketPlace', {
  state: () => {
    return {
      categories: [
        'Animals & Pet Supplies',
        'Apparel & Accessories',
        'Arts & Entertainment',
        'Baby & Toddler',
        'Business & Industrial',
        'Cameras & Optics',
        'Electronics',
        'Food, Beverages & Tobacco',
        'Furniture',
        'Hardware',
        'Health & Beauty',
        'Home & Garden',
        'Luggage & Bags',
        'Mature',
        'Media',
        'Office Supplies',
        'Others',
        'Religious & Ceremonial',
        'Software',
        'Sporting Goods',
        'Toys & Games',
        'Vehicles & Parts',
        'Wedding Supplies',
      ],
      countries: [
        'Afghanistan',
        'Albania',
        'Algeria',
        'Andorra',
        'Angola',
        'Antigua and Barbuda',
        'Argentina',
        'Armenia',
        'Australia',
        'Austria',
        'Azerbaijan',
        'Bahamas',
        'Bahrain',
        'Bangladesh',
        'Barbados',
        'Belarus',
        'Belgium',
        'Belize',
        'Benin',
        'Bhutan',
        'Bolivia',
        'Bosnia and Herzegovina',
        'Botswana',
        'Brazil',
        'Brunei',
        'Bulgaria',
        'Burkina Faso',
        'Burundi',
        "Côte d'Ivoire",
        'Cabo Verde',
        'Cambodia',
        'Cameroon',
        'Canada',
        'Central African Republic',
        'Chad',
        'Chile',
        'China',
        'Colombia',
        'Comoros',
        'Congo (Congo-Brazzaville)',
        'Costa Rica',
        'Croatia',
        'Cuba',
        'Cyprus',
        'Czechia (Czech Republic)',
        'Congo',
        'Denmark',
        'Djibouti',
        'Dominica',
        'Dominican Republic',
        'Ecuador',
        'Egypt',
        'El Salvador',
        'Equatorial Guinea',
        'Eritrea',
        'Estonia',
        "Eswatini (fmr. 'Swaziland')",
        'Ethiopia',
        'Fiji',
        'Finland',
        'France',
        'Gabon',
        'Gambia',
        'Georgia',
        'Germany',
        'Ghana',
        'Greece',
        'Grenada',
        'Guatemala',
        'Guinea',
        'Guinea-Bissau',
        'Guyana',
        'Haiti',
        'Honduras',
        'Hungary',
        'Iceland',
        'India',
        'Indonesia',
        'Iran',
        'Iraq',
        'Ireland',
        'Israel',
        'Italy',
        'Jamaica',
        'Japan',
        'Jordan',
        'Kazakhstan',
        'Kenya',
        'Kiribati',
        'Kuwait',
        'Kyrgyzstan',
        'Laos',
        'Latvia',
        'Lebanon',
        'Lesotho',
        'Liberia',
        'Libya',
        'Liechtenstein',
        'Lithuania',
        'Luxembourg',
        'Madagascar',
        'Malawi',
        'Malaysia',
        'Maldives',
        'Mali',
        'Malta',
        'Marshall Islands',
        'Mauritania',
        'Mauritius',
        'Mexico',
        'Micronesia',
        'Moldova',
        'Monaco',
        'Mongolia',
        'Montenegro',
        'Morocco',
        'Mozambique',
        'Myanmar (formerly Burma)',
        'Namibia',
        'Nauru',
        'Nepal',
        'Netherlands',
        'New Zealand',
        'Nicaragua',
        'Niger',
        'Nigeria',
        'North Korea',
        'North Macedonia',
        'Norway',
        'Oman',
        'Pakistan',
        'Palau',
        'Panama',
        'Papua New Guinea',
        'Paraguay',
        'Peru',
        'Philippines',
        'Poland',
        'Portugal',
        'Qatar',
        'Romania',
        'Russia',
        'Rwanda',
        'Saint Kitts and Nevis',
        'Saint Lucia',
        'Saint Vincent and the Grenadines',
        'Samoa',
        'San Marino',
        'Sao Tome and Principe',
        'Saudi Arabia',
        'Senegal',
        'Serbia',
        'Seychelles',
        'Sierra Leone',
        'Singapore',
        'Slovakia',
        'Slovenia',
        'Solomon Islands',
        'Somalia',
        'South Africa',
        'South Korea',
        'South Sudan',
        'Spain',
        'Sri Lanka',
        'Sudan',
        'Suriname',
        'Sweden',
        'Switzerland',
        'Syria',
        'Taiwan',
        'Tajikistan',
        'Tanzania',
        'Thailand',
        'Timor-Leste',
        'Togo',
        'Tonga',
        'Trinidad and Tobago',
        'Tunisia',
        'Turkey',
        'Turkmenistan',
        'Tuvalu',
        'Uganda',
        'Ukraine',
        'United Arab Emirates',
        'United Kingdom',
        'United States of America',
        'Uruguay',
        'Uzbekistan',
        'Vanuatu',
        'Vatican City',
        'Venezuela',
        'Vietnam',
        'Yemen',
        'Zambia',
        'Zimbabwe',
      ],
      currentPage: '',
      isConnectDialogVisible: false,
      isMessageDialogVisible: false,
      isMessageSentDialogVisible: false,
      loading: false,
      loadingProfile: false,
      maxImagesAllowed: 6,
      message: null,
      pagination: {},
      profiles: null,
      profile: {
        brandName: null,
        category: null,
        cocoProfileImages: [],
        images: [],
        location: null,
        numOfProducts: null,
        shippingPolicyUrl: null,
        socialMedia: null,
        typicalMarginPrecentage: null,
        website: null,
      },
      productsRange: ['0-20', '21-50', '51-150', '151+'],
      queries: {
        'filters[category]': null,
        'filters[country_name]': null,
        'filters[product_count]': null,
        limiter: 16,
        search_str: null,
      },
      searchQuery: null,
      searchString: null,
      selectedProfile: null,
    };
  },

  getters: {
    storeId() {
      const { storeId } = useConnectionsStore();
      return storeId;
    },

    storeType() {
      const { storeType } = useConnectionsStore();
      return storeType;
    },
  },

  actions: deepmerge.all([
    fetchProfile,
    fetchProfiles,
    sendMessage,
    updateProfile,
  ]),

  persist: {
    enabled: true,
    strategies: [
      {
        key: 'marketPlace',
        storage: sessionStorage,
        paths: [
          'queries',
          'searchString',
        ],
      },
    ],
  },
});
