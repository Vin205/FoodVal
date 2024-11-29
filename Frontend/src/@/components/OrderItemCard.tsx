import { Order, OrderStatus } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Separator } from "@radix-ui/react-separator";

import { ORDER_STATUS } from "@/config/order-status-config";
import { useUpdateMyIndustryOrder } from "@/api/MyIndustryApi";
import { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

type Props = {
    order: Order;
  };


  const OrderItemCard = ({ order }: Props) => {
    const { updateIndustryStatus, isLoading } = useUpdateMyIndustryOrder();
    const [status, setStatus] = useState<OrderStatus>(order.status);

    useEffect(() => {
      setStatus(order.status);
    }, [order.status]);

    const handleStatusChange = async (newStatus: OrderStatus) => {
        await updateIndustryStatus({
          orderId: order._id as string,
          status: newStatus,
        });
        setStatus(newStatus);
      };
    const getTime = () => {
        const orderDateTime = new Date(order.createdAt);
    
        const hours = orderDateTime.getHours();
        const minutes = orderDateTime.getMinutes();
    
        const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    
        return `${hours}:${paddedMinutes}`;
      };
    return(
        <Card>
             <CardHeader>
        <CardTitle className="grid md:grid-cols-4 gap-4 justify-between mb-3">
          <div>
            Customer Name:
            <span className="ml-2 font-normal">
              {order.deliveryDetails.name}
            </span>
          </div>
          <div>
            Delivery address:
            <span className="ml-2 font-normal">
              {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
            </span>
          </div>
          <div>
            Time:
            <span className="ml-2 font-normal">{getTime()}</span>
          </div>
          <div>
            Total Cost:
            <span className="ml-2 font-normal">
              Rs{(order.totalAmount / 100).toFixed(2)}
            </span>
          </div>
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
      <div className="flex flex-col space-y-1.5">
          <Label htmlFor="status">What is the status of this order?</Label>
          <Select
            value={status}
            disabled={isLoading}
            onValueChange={(value) => handleStatusChange(value as OrderStatus)}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent position="popper">
              {ORDER_STATUS.map((status) => (
                <SelectItem value={status.value}>{status.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        </CardContent>
            
        </Card>
    )

}

export default OrderItemCard;