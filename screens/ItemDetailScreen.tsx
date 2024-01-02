import React from 'react';
import ItemDetail from '../components/ItemDetail';

const ItemDetailScreen = ({ route }) => {
  const { itemId } = route.params;
  return <ItemDetail itemId={itemId} />;
};

export default ItemDetailScreen;
