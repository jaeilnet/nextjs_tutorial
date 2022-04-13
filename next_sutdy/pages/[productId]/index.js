import React from "react";
import Detail from "../../components/Detail";
import HeadCommon from "../../components/Head";
import useFetch from "../../components/useFetch";

const ProductDetail = ({ detailItems }) => {
  return (
    <React.Fragment>
      <HeadCommon meta={detailItems[0]} />
      <Detail items={detailItems[0]} />;
    </React.Fragment>
  );
};

export async function getServerSideProps(ctx) {
  const { list } = await useFetch(
    "https://gift.kakao.com/a/v1/pages/productGroups/collections?page=1&size=100&productCollectionIds"
  );

  const filter = list.items.filter(
    (e) => e.productId === +ctx.params.productId
  );

  return {
    props: {
      detailItems: filter,
    },
  };
}

export default ProductDetail;
