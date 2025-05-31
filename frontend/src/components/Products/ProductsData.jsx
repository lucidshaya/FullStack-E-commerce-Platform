import { useParams } from 'react-router-dom';

const ProductsData = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`/api/products/${id}`);
      const data = await response.json();
      setProduct(data);
      setMainImage(data.images[0].url);
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;
  // Rest of the component...
};

export default ProductsData;