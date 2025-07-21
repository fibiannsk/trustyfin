
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { AlertTriangle, Shield, Lock, Eye, Ban } from "lucide-react";

export function SecurityCenter() {
  const securityAlerts = [
    {
      id: "SEC001",
      type: "Suspicious Login",
      user: "john.doe@email.com",
      description: "Login attempt from unusual location (Moscow, Russia)",
      severity: "High",
      timestamp: "2024-01-15 14:30:00",
      status: "Active"
    },
    {
      id: "SEC002",
      type: "Multiple Failed Attempts",
      user: "jane.smith@email.com",
      description: "5 consecutive failed login attempts",
      severity: "Medium",
      timestamp: "2024-01-15 13:45:00",
      status: "Resolved"
    },
    {
      id: "SEC003",
      type: "Large Transaction",
      user: "mike.johnson@email.com",
      description: "Transaction exceeding daily limit ($50,000)",
      severity: "High",
      timestamp: "2024-01-15 12:20:00",
      status: "Under Review"
    }
  ];

  const securityMetrics = [
    { label: "Failed Login Attempts (24h)", value: "23", trend: "down" },
    { label: "Blocked Transactions", value: "5", trend: "up" },
    { label: "Active Security Alerts", value: "3", trend: "stable" },
    { label: "Compliance Score", value: "98%", trend: "up" }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'destructive';
      case 'Medium': return 'secondary';
      case 'Low': return 'default';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Security Center</h2>
        <Button className="bg-red-600 hover:bg-red-700">
          <Shield className="w-4 h-4 mr-2" />
          Emergency Lock
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {securityMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">{metric.label}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                </div>
                <div className={`w-2 h-2 rounded-full ${
                  metric.trend === 'up' ? 'bg-red-500' : 
                  metric.trend === 'down' ? 'bg-green-500' : 'bg-yellow-500'
                }`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            Active Security Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {securityAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={getSeverityColor(alert.severity)}>
                      {alert.severity}
                    </Badge>
                    <span className="font-medium">{alert.type}</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-1">{alert.description}</p>
                  <p className="text-xs text-slate-500">User: {alert.user}</p>
                  <p className="text-xs text-slate-500">Time: {alert.timestamp}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{alert.status}</Badge>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Lock className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Ban className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Login Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { user: "admin@bank.com", location: "New York, US", time: "2 min ago", status: "success" },
                { user: "manager@bank.com", location: "London, UK", time: "15 min ago", status: "success" },
                { user: "john.doe@email.com", location: "Moscow, RU", time: "30 min ago", status: "blocked" },
                { user: "support@bank.com", location: "Toronto, CA", time: "1 hour ago", status: "success" },
              ].map((login, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-slate-50 rounded">
                  <div>
                    <p className="font-medium text-sm">{login.user}</p>
                    <p className="text-xs text-slate-600">{login.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-600">{login.time}</p>
                    <Badge variant={login.status === 'success' ? 'default' : 'destructive'} className="text-xs">
                      {login.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { component: "Authentication Service", status: "Operational", uptime: "99.9%" },
                { component: "Transaction Processing", status: "Operational", uptime: "99.8%" },
                { component: "Database Cluster", status: "Operational", uptime: "100%" },
                { component: "Payment Gateway", status: "Degraded", uptime: "98.5%" },
              ].map((service, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-slate-50 rounded">
                  <div>
                    <p className="font-medium text-sm">{service.component}</p>
                    <p className="text-xs text-slate-600">Uptime: {service.uptime}</p>
                  </div>
                  <Badge variant={service.status === 'Operational' ? 'default' : 'secondary'}>
                    {service.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
