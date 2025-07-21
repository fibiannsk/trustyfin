
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
//import { Button } from "../ui/button";
import { 
  Send, 
  Plus, 
  Smartphone, 
  CreditCard, 
  PiggyBank,
  Receipt 
} from "lucide-react";

export const QuickActions = () => {
  const actions = [
    {
      title: "Send Money",
      description: "Transfer to friends & family",
      icon: <Send className="h-6 w-6" />,
      color: "bg-blue-500 hover:bg-blue-600"
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {actions.map((action, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
            <CardContent className="p-6 text-center">
              <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center text-white mx-auto mb-3 group-hover:scale-110 transition-transform duration-200`}>
                {action.icon}
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">{action.title}</h3>
              <p className="text-xs text-gray-500">{action.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
