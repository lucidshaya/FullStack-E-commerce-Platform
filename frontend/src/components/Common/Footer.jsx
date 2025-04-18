import React from 'react'
import { TbBrandInstagram, TbBrandLinkedin, TbBrandMeta, TbBrandTwitter } from 'react-icons/tb';
import { Link } from 'react-router-dom'
import { FiPhoneCall } from 'react-icons/fi';

const Footer = () => {
return (
    <footer className="border-t py-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0">
            <div>
                <h3 className="text-lg text-gray-800 mb-4">Contact Us</h3>
                <p className="text-gray-500 mb-4">
                    Have questions or need help? Reach out to our support team.
                </p>
                <p className="font-medium text-sm text-gray-600 mb-6">
                    We're here to assist you 24/7.
                </p>
                <form className="flex">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="p-3 w-full text-sm border-t border-l border-b border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-black text-white px-6 py-3 text-sm rounded-r-md hover:bg-gray-800 transition-all"
                    >
                        Contact Support
                    </button>
                </form>
            </div>

            {/* Support Links */}
            <div>
                <h3 className="text-lg text-gray-800 mb-4">Support</h3>
                <ul className="space-y-2 text-gray-600">
                    <li>
                        <Link to="#" className="hover:text-gray-500 transition-colors">
                            FAQ
                        </Link>
                    </li>
                    <li>
                        <Link to="#" className="hover:text-gray-500 transition-colors">
                            Shipping & Returns
                        </Link>
                    </li>
                    <li>
                        <Link to="#" className="hover:text-gray-500 transition-colors">
                            Order Tracking
                        </Link>
                    </li>
                    <li>
                        <Link to="#" className="hover:text-gray-500 transition-colors">
                            Payment Options
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Company Links */}
            <div>
                <h3 className="text-lg text-gray-800 mb-4">Company</h3>
                <ul className="space-y-2 text-gray-600">
                    <li>
                        <Link to="#" className="hover:text-gray-500 transition-colors">
                            About Us
                        </Link>
                    </li>
                    <li>
                        <Link to="#" className="hover:text-gray-500 transition-colors">
                            Careers
                        </Link>
                    </li>
                    <li>
                        <Link to="#" className="hover:text-gray-500 transition-colors">
                            Press
                        </Link>
                    </li>
                    <li>
                        <Link to="#" className="hover:text-gray-500 transition-colors">
                            Terms & Conditions
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Social Links */}
            <div>
                <h3 className="text-lg text-gray-800 mb-4">Follow Us</h3>
                <ul className="space-y-2 text-gray-600">
                    <li>
                        <Link to="#" className="hover:text-gray-500 transition-colors">
                            Facebook <TbBrandMeta className="inline-block ml-1" />
                        </Link>
                    </li>
                    <li>
                        <Link to="#" className="hover:text-gray-500 transition-colors">
                            Twitter <TbBrandTwitter className="inline-block ml-1" />
                        </Link>
                    </li>
                    <li>
                        <Link to="#" className="hover:text-gray-500 transition-colors">
                            Instagram <TbBrandInstagram className="inline-block ml-1" />
                        </Link>
                    </li>
                    <li>
                        <Link to="#" className="hover:text-gray-500 transition-colors">
                            LinkedIn <TbBrandLinkedin className="inline-block ml-1" />
                        </Link>
                    </li>
                </ul>
                <p className="text-gray-500">Call us </p>
                <p>
                    <FiPhoneCall className="inline-block mr-2" />
                    +234 1231241235
                </p>
            </div>
        </div>
        {/* Footer Bottom */}
        <div className="container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-300 pt-6">
            <p className="text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} 401TechNologies. All rights reserved.
            </p>
        </div>
    </footer>
);
}

export default Footer