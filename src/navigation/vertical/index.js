// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import CampaignIcon from '@mui/icons-material/Campaign'
import PublicIcon from '@mui/icons-material/Public'
import ApartmentIcon from '@mui/icons-material/Apartment'
import LocationCityIcon from '@mui/icons-material/LocationCity'
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices'
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService'
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import AppsOutageIcon from '@mui/icons-material/AppsOutage';

const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Account Settings',
      icon: AccountCogOutline,
      path: '/account-settings'
    },

    {
      sectionTitle: 'Advertise with us'
    },
    {
      title: 'Advertisement',
      icon: CampaignIcon,
      path: '/advertisement'
    },
    {
      title: 'Mini Tv',
      icon: LiveTvIcon,
      path: '/minitv'
    },

    {
      sectionTitle: 'AFMX Regions'
    },
    {
      title: 'Country',
      icon: PublicIcon,
      path: '/country'
    },
    {
      title: 'State',
      icon: ApartmentIcon,
      path: '/state'
    },
    {
      title: 'City',
      icon: LocationCityIcon,
      path: '/city'
    },
    {
      sectionTitle: 'Our Service Departments'
    },
    {
      title: 'Service Department',
      icon: HomeRepairServiceIcon,
      path: '/service-department'
    },
    {
      title: 'Services',
      icon: MiscellaneousServicesIcon,
      path: '/services'
    },
    {
      sectionTitle: 'CHEMICAL SHOPPING CENTER '
    },
    {
      title: 'Categories',
      icon: CategoryIcon,
      path: '/categories'
    },
    {
      title: 'Orders',
      icon: ShoppingCartCheckoutIcon,
      path: '/orders'
    },
    {
      sectionTitle: 'Complaints'
    },
    {
      title: 'Complaint Portal',
      icon: AppsOutageIcon,
      path: '/complainPortal'
    },

    {
      sectionTitle: 'Pages'
    },
    {
      title: 'Login',
      icon: Login,
      path: '/pages/login',
      openInNewTab: true
    },
    {
      title: 'Register',
      icon: AccountPlusOutline,
      path: '/pages/register',
      openInNewTab: true
    },
    // {
    //   title: 'Error',
    //   icon: AlertCircleOutline,
    //   path: '/pages/error',
    //   openInNewTab: true
    // },
    // {
    //   sectionTitle: 'User Interface'
    // },
    // {
    //   title: 'Typography',
    //   icon: FormatLetterCase,
    //   path: '/typography'
    // },
    // {
    //   title: 'Icons',
    //   path: '/icons',
    //   icon: GoogleCirclesExtended
    // },
    // {
    //   title: 'Cards',
    //   icon: CreditCardOutline,
    //   path: '/cards'
    // },
    // {
    //   title: 'Tables',
    //   icon: Table,
    //   path: '/tables'
    // },
    // {
    //   icon: CubeOutline,
    //   title: 'Form Layouts',
    //   path: '/form-layouts'
    // }
  ]
}

export default navigation
