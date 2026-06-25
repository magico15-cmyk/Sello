-- Seed default pages for all existing stores
DO $$ 
DECLARE
    store_record RECORD;
    about_content TEXT := '<div style="text-align: center;"><h1 style="font-size: 2.5em; font-weight: bold; margin-bottom: 0.5em; color: #111827;">About Us</h1><p style="font-size: 1.1em; color: #4b5563; max-width: 600px; margin: 0 auto 2em auto;">We are dedicated to bringing you the highest quality products with an unmatched shopping experience.</p></div><h2>Our Story</h2><p>Founded with a simple mission: to make premium products accessible to everyone without compromising on quality or service. We realized that shopping online should be straightforward, reliable, and trustworthy.</p><p>Every product we offer is carefully curated and rigorously checked to ensure it meets our high standards. We believe in transparency and building long-lasting relationships with our customers.</p><h2>Why Choose Us</h2><ul><li><strong>Fast Delivery:</strong> 24 to 48 hours for local shipments.</li><li><strong>Cash on Delivery:</strong> Inspect your product before paying.</li><li><strong>Quality Guarantee:</strong> 100% satisfaction or your money back.</li></ul>';
    shipping_content TEXT := '<div style="text-align: center;"><h1 style="font-size: 2.5em; font-weight: bold; margin-bottom: 0.5em; color: #111827;">Shipping & Delivery</h1><p style="font-size: 1.1em; color: #4b5563; max-width: 600px; margin: 0 auto 2em auto;">Fast, reliable delivery directly to your door. Inspect your order before you pay.</p></div><h3>Fast Processing & Dispatch</h3><p>We know you''re excited to receive your order. Once your order is confirmed, our team immediately begins processing it. Orders are typically dispatched within hours, ensuring the fastest possible delivery to your location.</p><h3>24 to 48 Hours Local Delivery</h3><p>We partner with the best local delivery services to ensure your package arrives quickly and safely. For most local areas, you can expect your order to be delivered within <strong>24 to 48 hours</strong>.</p><h3>Cash on Delivery (COD)</h3><p>Your trust is our top priority. We operate strictly on a <strong>Cash on Delivery (COD)</strong> basis. This means you do not need to pay anything online.</p><ul><li><strong>No upfront payments</strong> required.</li><li><strong>Inspect before you pay.</strong> You have the right to check your product at the door.</li><li><strong>Pay the courier in cash</strong> only when you are 100% satisfied.</li></ul>';
    faq_content TEXT := '<div style="text-align: center;"><h1 style="font-size: 2.5em; font-weight: bold; margin-bottom: 0.5em; color: #111827;">Frequently Asked Questions</h1><p style="font-size: 1.1em; color: #4b5563; max-width: 600px; margin: 0 auto 2em auto;">Everything you need to know about ordering, shipping, and our policies.</p></div><h3>How do I place an order?</h3><p>Placing an order is extremely simple. Just browse our products, click "Order Now", and fill out the brief form with your name, phone number, and delivery address. That''s it! No credit card or online payment is required.</p><h3>When will I receive my order?</h3><p>We pride ourselves on fast delivery. Most local orders are processed immediately and delivered directly to your door within 24 to 48 hours.</p><h3>Can I inspect the product before paying?</h3><p>Yes, absolutely! Because we operate on a Cash on Delivery (COD) basis, you have the full right to inspect your package when the courier arrives. You only pay if you are completely satisfied with the product.</p><h3>What is your return/exchange policy?</h3><p>We want you to love your purchase. If the product is defective or not as described, you can simply refuse to pay for it upon delivery. If you encounter issues shortly after purchasing, please contact our support team and we will arrange an exchange quickly and hassle-free.</p><h3>Is my personal information secure?</h3><p>100% secure. We only collect the basic details necessary to deliver your order (Name, Phone Number, and Address). We never share or sell your data to third parties.</p>';
BEGIN
    FOR store_record IN SELECT id FROM stores LOOP
        -- Insert About Us
        INSERT INTO store_pages (store_id, title, slug, content, is_published)
        VALUES (store_record.id, 'About Us', 'about-us', about_content, true)
        ON CONFLICT DO NOTHING;
        
        -- Insert Shipping & Delivery
        INSERT INTO store_pages (store_id, title, slug, content, is_published)
        VALUES (store_record.id, 'Shipping & Delivery', 'shipping', shipping_content, true)
        ON CONFLICT DO NOTHING;
        
        -- Insert FAQ
        INSERT INTO store_pages (store_id, title, slug, content, is_published)
        VALUES (store_record.id, 'FAQ', 'faq', faq_content, true)
        ON CONFLICT DO NOTHING;
    END LOOP;
END $$;
