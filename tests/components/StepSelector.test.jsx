import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StepSelector from '../../components/StepSelector';

describe('StepSelector', () => {
    const mockOptions = {
        label: 'Test Options',
        choices: [
            {
                name: 'Option 1',
                emoji: '🍜',
                description: 'Test description 1',
                price: 0,
                tags: ['vegetarian']
            },
            {
                name: 'Option 2',
                emoji: '🥩',
                description: 'Test description 2',
                price: 5,
                tags: []
            }
        ]
    };

    it('renders options correctly', () => {
        render(
            <StepSelector
                options={mockOptions}
                selectedOptions={null}
                onOptionSelect={() => { }}
            />
        );

        expect(screen.getByText('Test Options')).toBeInTheDocument();
        expect(screen.getByText('Option 1')).toBeInTheDocument();
        expect(screen.getByText('Option 2')).toBeInTheDocument();
    });

    it('applies selected class when an option is selected', () => {
        render(
            <StepSelector
                options={mockOptions}
                selectedOptions="Option 1"
                onOptionSelect={() => { }}
            />
        );

        const option1Button = screen.getByText('Option 1').closest('button');
        expect(option1Button).toHaveClass('selected');
    });

    it('calls onOptionSelect when an option is clicked', () => {
        const handleSelect = jest.fn();
        render(
            <StepSelector
                options={mockOptions}
                selectedOptions={null}
                onOptionSelect={handleSelect}
            />
        );

        const option1Button = screen.getByText('Option 1').closest('button');
        fireEvent.click(option1Button);

        expect(handleSelect).toHaveBeenCalledWith('Option 1');
    });

    it('filters vegetarian options when veggieOnly is true', () => {
        render(
            <StepSelector
                options={mockOptions}
                selectedOptions={null}
                onOptionSelect={() => { }}
                veggieOnly={true}
            />
        );

        expect(screen.getByText('Option 1')).toBeInTheDocument();
        expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
    });
}); 