export default function Category(req, res) {
  if (res.status === 201) {
    const response = fetch(
      "/https://gift.kakao.com/a/v1/pages/productGroups/collections?page=1&size=100&productCollectionIds"
    )
      .then((res) => console.log(res))
      .catch((err) => console.log(err, "err"));

    console.log(res, "data");
  }
}
