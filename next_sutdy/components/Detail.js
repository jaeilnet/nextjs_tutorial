import React from "react";
import Image from "next/image";
import classes from "./Detail.module.css";

const imgLoader = ({ src }) => {
  return src;
};

const List = ({ items }) => {
  return (
    <React.Fragment>
      <div
        style={{ backgroundImage: `url(${items.imageUrl})` }}
        className={classes.bg}
      />
      <div className={classes.flex}>
        <div className={classes.container} key={items.productId}>
          <div className={classes.content}>
            <div className={classes.title}>{items.displayName}</div>
            <Image
              style={{ borderRadius: "8px" }}
              loader={imgLoader}
              width={500}
              height={500}
              src={items.imageUrl}
              alt={items.displayName}
            />
            <div>
              <h2>{items.brandName}</h2>
              <h1>{items.name}</h1>
              <h2>{items.salePrice.toLocaleString()}원</h2>
              <h2>{items.soldOut && "Sold Out!"}</h2>
              <h2>{items.talkStar && "TalkStar"}</h2>
              <h3>{items.stamp}</h3>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default List;
