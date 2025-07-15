-- Insert default roles
INSERT INTO roles (name) VALUES ('ROLE_USER') ON CONFLICT DO NOTHING;
INSERT INTO roles (name) VALUES ('ROLE_MODERATOR') ON CONFLICT DO NOTHING;
INSERT INTO roles (name) VALUES ('ROLE_ADMIN') ON CONFLICT DO NOTHING;

-- Insert default categories
INSERT INTO categories (name, description, icon_name, is_active) VALUES 
('Technology', 'Tech meetups, coding workshops, and developer events', 'laptop-outline', true),
('Business', 'Networking events, entrepreneurship, and professional development', 'briefcase-outline', true),
('Health & Fitness', 'Workout groups, yoga classes, and wellness events', 'fitness-outline', true),
('Arts & Culture', 'Art exhibitions, cultural events, and creative workshops', 'color-palette-outline', true),
('Music', 'Concerts, music lessons, and jam sessions', 'musical-notes-outline', true),
('Sports', 'Sports events, tournaments, and recreational activities', 'football-outline', true),
('Education', 'Learning groups, study sessions, and educational workshops', 'school-outline', true),
('Food & Drink', 'Cooking classes, wine tastings, and food events', 'restaurant-outline', true),
('Travel', 'Travel groups, adventure activities, and exploration', 'airplane-outline', true),
('Gaming', 'Board games, video games, and gaming tournaments', 'game-controller-outline', true),
('Photography', 'Photo walks, photography workshops, and exhibitions', 'camera-outline', true),
('Books & Literature', 'Book clubs, writing groups, and literary events', 'library-outline', true),
('Volunteering', 'Community service and volunteer opportunities', 'heart-outline', true),
('Parenting', 'Parent groups, family activities, and childcare support', 'people-outline', true),
('Pets', 'Pet meetups, training sessions, and animal welfare', 'paw-outline', true)
ON CONFLICT (name) DO NOTHING;