import React from 'react';
import EditCustomerForm from '../components/EditCustomer.jsx';
import { useToast } from '../hooks/use-toast';

const Index = () => {
  const { toast } = useToast();

  // Sample props for demonstration
  const labels = {
    fullName: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
    address: "Address",
    balance: "Account Balance"
  };

  const userData = {
    id: "CUST-2024-001",
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, New York, NY 10001",
    balance: "15750.00"
  };

  const handleUpdate = async (updatedData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Updating customer data:', updatedData);
    
    toast({
      title: "Customer Updated Successfully",
      description: `${updatedData.fullName}'s information has been updated.`,
    });
  };

  return (
    <div className="min-h-screen bg-banking-light py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-banking-dark mb-2">
            Banking Admin Portal
          </h1>
          <p className="text-muted-foreground">
            Manage customer accounts and information
          </p>
        </div>

        {/* Form Component */}
        <EditCustomerForm 
          labels={labels}
          userData={userData}
          onUpdate={handleUpdate}
        />

        {/* Additional Info */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Professional banking administration interface built with React and Tailwind CSS</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
