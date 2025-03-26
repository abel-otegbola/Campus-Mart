export default function TandCPage() {
    return (
    <div className="container mx-auto py-8 max-w-4xl">
        <div className="rounded-lg p-6 md:p-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Terms and Conditions</h1>
            <p className="text-gray-600 text-center mb-8">Last Updated: [Insert Date]</p>

            <div className="mb-8">
                <p className="text-gray-700 mb-4">Welcome to Campus mart. These Terms and Conditions govern your use of our platform that connects student entrepreneurs with buyers.</p>
                <p className="text-gray-700">By accessing or using our website, you agree to be bound by these Terms. If you disagree, please do not use our services.</p>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">1. Eligibility</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>You must be at least 13 years old (or 16 in the EU) to use our services</li>
                    <li>Student entrepreneurs must verify their academic status</li>
                    <li>Buyers must provide accurate payment information</li>
                </ul>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">2. User Accounts</h2>
                <ol className="list-decimal pl-5 space-y-3 text-gray-700">
                    <li>
                        <strong>Account Creation:</strong> You must provide accurate information and keep credentials secure
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>No impersonation or false identities permitted</li>
                            <li>You&apos;re responsible for all account activity</li>
                        </ul>
                    </li>
                    <li>
                        <strong>Account Termination:</strong> We reserve the right to suspend accounts for:
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Violation of these Terms</li>
                            <li>Fraudulent activity</li>
                            <li>Abusive behavior</li>
                        </ul>
                    </li>
                </ol>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">3. Transactions</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>All sales are between buyers and student sellers - we act only as the platform</li>
                    <li>We charge a [X]% service fee on transactions</li>
                    <li>Payments are processed through our third-party payment providers</li>
                    <li>Disputes should be resolved directly between parties before contacting support</li>
                </ul>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">4. Content Rules</h2>
                <p className="text-gray-700 mb-3">You agree not to post content that:</p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Violates intellectual property rights</li>
                    <li>Contains hate speech or harassment</li>
                    <li>Is fraudulent, deceptive, or illegal</li>
                    <li>Contains adult or dangerous material</li>
                </ul>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">5. Intellectual Property</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Our platform and original content are owned by [Your Company]</li>
                    <li>Student entrepreneurs retain ownership of their products/content</li>
                    <li>By posting, you grant us a license to display your content on our platform</li>
                </ul>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">6. Limitation of Liability</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>We&apos;re not liable for:
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Products/services sold by student entrepreneurs</li>
                            <li>Technical issues beyond our reasonable control</li>
                            <li>Indirect or consequential damages</li>
                        </ul>
                    </li>
                    <li>Maximum liability limited to fees you&apos;ve paid us in past 6 months</li>
                </ul>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">7. Modifications</h2>
                <p className="text-gray-700">We may update these Terms periodically. Continued use after changes constitutes acceptance. We&apos;ll notify users of material changes.</p>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">8. Governing Law</h2>
                <p className="text-gray-700">These Terms are governed by the laws of [Your Country/State]. Any disputes will be resolved in [Your Jurisdiction] courts.</p>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">9. Contact Information</h2>
                <p className="text-gray-700">For questions about these Terms:</p>
                <p className="mt-2 text-gray-700">
                </p>
            </div>
        </div>
    </div>
    )
}