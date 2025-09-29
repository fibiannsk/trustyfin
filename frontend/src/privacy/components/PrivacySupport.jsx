import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Shield, Phone, Mail, MessageCircle, FileText, Lock, Eye, Users, Clock, AlertTriangle } from "lucide-react";

export default function PrivacySupport() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-secondary text-secondary-foreground py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Shield className="w-8 h-8 text-primary" />
            <div>
              <h1>Trustyfin Bank</h1>
              <p className="opacity-90">Privacy & Support Center</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-primary text-primary-foreground border-primary">
            Secure Banking
          </Badge>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Privacy Policy Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-primary" />
                  Privacy Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="flex items-center gap-2 mb-3">
                    <Eye className="w-4 h-4" />
                    Information We Collect
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    We collect information you provide directly to us, such as when you create an account, 
                    make a transaction, or contact us for support.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Personal identification information (name, address, phone number, email)</li>
                    <li>Financial information (account numbers, transaction history, credit information)</li>
                    <li>Device and usage information when you use our digital services</li>
                    <li>Location information when you use our mobile applications</li>
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="flex items-center gap-2 mb-3">
                    <Users className="w-4 h-4" />
                    How We Use Your Information
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    We use the information we collect to provide, maintain, and improve our services.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Process transactions and maintain your accounts</li>
                    <li>Verify your identity and prevent fraud</li>
                    <li>Provide customer service and support</li>
                    <li>Send important notices about your accounts</li>
                    <li>Comply with legal and regulatory requirements</li>
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="flex items-center gap-2 mb-3">
                    <Shield className="w-4 h-4" />
                    Information Security
                  </h3>
                  <p className="text-muted-foreground">
                    We implement industry-standard security measures to protect your personal and financial 
                    information, including encryption, secure servers, and multi-factor authentication.
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="flex items-center gap-2 mb-3">
                    <FileText className="w-4 h-4" />
                    Your Rights
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    You have certain rights regarding your personal information:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Access and review your personal information</li>
                    <li>Request corrections to inaccurate information</li>
                    <li>Opt-out of certain communications</li>
                    <li>Request deletion of your information (subject to legal requirements)</li>
                  </ul>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <p className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Last Updated: January 15, 2025
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Support Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  Customer Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 border rounded-lg">
                      <Phone className="w-5 h-5 text-primary" />
                      <div>
                        <h4>Phone Support</h4>
                        <p className="text-muted-foreground">+1-254-400-6117</p>
                        <p className="text-muted-foreground">24/7 Available</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 border rounded-lg">
                      <Mail className="w-5 h-5 text-primary" />
                      <div>
                        <h4>Email Support</h4>
                        <p className="text-muted-foreground">support@trustyfinbank.icu</p>
                        <p className="text-muted-foreground">Response within 24 hours</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 border rounded-lg">
                      <MessageCircle className="w-5 h-5 text-primary" />
                      <div>
                        <h4>Live Chat</h4>
                        <p className="text-muted-foreground">Available in mobile app</p>
                        <p className="text-muted-foreground">Mon-Fri 8AM-8PM EST</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 border rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-primary" />
                      <div>
                        <h4>Emergency Line</h4>
                        <p className="text-muted-foreground">+1-254-400-6117</p>
                        <p className="text-muted-foreground">24/7 Fraud Prevention</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* FAQ Section */}
                <div>
                  <h3 className="mb-4">Frequently Asked Questions</h3>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="account">
                      <AccordionTrigger>How do I open a new account?</AccordionTrigger>
                      <AccordionContent>
                        You can open a new account online at trustyfinbank.icu by  
                        visiting any of our branch locations. You'll need a valid ID, Social Security 
                        number, and an initial deposit to get started.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="fees">
                      <AccordionTrigger>What are your account fees?</AccordionTrigger>
                      <AccordionContent>
                        Our checking accounts have no monthly maintenance fees with a minimum balance of $500. 
                        Savings accounts earn interest with no fees for balances over $100. ATM fees are waived 
                        at Trustyfin ATMs and we reimburse up to $10/month in out-of-network ATM fees.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="mobile">
                      <AccordionTrigger>How do I use mobile banking?</AccordionTrigger>
                      <AccordionContent>
                        Download the Trustyfin Bank app from the App Store or Google Play. Log in with your 
                        online banking credentials to access account balances, transfer money, pay bills, 
                        deposit checks, and find ATMs. Enable biometric login for faster, secure access.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="security">
                      <AccordionTrigger>How do you protect my information?</AccordionTrigger>
                      <AccordionContent>
                        We use bank-level security including 256-bit SSL encryption, multi-factor authentication, 
                        fraud monitoring, and secure data centers. We never store sensitive information on mobile 
                        devices and monitor all accounts 24/7 for suspicious activity.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="loans">
                      <AccordionTrigger>What loan products do you offer?</AccordionTrigger>
                      <AccordionContent>
                        We offer personal loans, auto loans, mortgages, home equity lines of credit, and 
                        business loans. Visit our website or speak with a loan specialist to learn about 
                        current rates and requirements. Pre-qualification is available online.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Center</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Shield className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">FDIC Insured</p>
                    <p className="text-muted-foreground">Up to $250,000</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Lock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">256-bit SSL</p>
                    <p className="text-muted-foreground">Bank-level encryption</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Can't find what you're looking for? Our support team is here to help.
                </p>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-muted mt-16 py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="mb-4">About Trustyfin</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>About Us</li>
                <li>Careers</li>
                <li>Investor Relations</li>
                <li>Press Room</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Products</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Checking Accounts</li>
                <li>Savings Accounts</li>
                <li>Loans</li>
                <li>Credit Cards</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Contact Us</li>
                <li>Branch Locator</li>
                <li>Online Banking Help</li>
                <li>Security Center</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Legal</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Accessibility</li>
                <li>Disclosures</li>
              </ul>
            </div>
          </div>
          <Separator className="mb-6" />
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground">
              © 2025 Trustyfin Bank. All rights reserved. Member FDIC. Equal Housing Lender.
            </p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <Badge variant="outline">FDIC</Badge>
              <Badge variant="outline">Equal Housing Lender</Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}