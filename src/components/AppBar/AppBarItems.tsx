import "./AppBarItems.css";
import { useSelector } from "react-redux";
import {
  balanceSelector,
  betSelector,
  winSelector,
} from "../../state/selectors";

export const AppBarItems = () => {
  const balance = useSelector(balanceSelector);
  const win = useSelector(winSelector);
  const bet = useSelector(betSelector);

  const items = [balance, win, bet];

  return (
    <div className="appBarItem">
      {items.map(
        (item, index) =>
          item.value > 0 && (
            <div
              key={index + item.value}
              style={{
                display: "flex",
                flexDirection: "row",
                padding: "0 8px",
                color: "#cfaf7c",
              }}
            >
              <p>{item.itemName}</p>
              <p style={{ padding: "0 4px", color: "white" }}>
                {Intl.NumberFormat("en-EN", {
                  style: "currency",
                  currency: "EUR",
                }).format(item.value)}
              </p>
            </div>
          )
      )}
    </div>
  );
};
