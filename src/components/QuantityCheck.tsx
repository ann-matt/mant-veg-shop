import { useCallback } from 'react';
import { ActionIcon, Group, Text, rem } from '@mantine/core';
import { Minus, Plus } from 'lucide-react';

type QtyControlProps = {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  size?: number; 
};


export default function QuantityCheck({
  value,
  onChange,
  min = 1,
  max = 99,
  size = 32,
}: QtyControlProps) 

{
  const dec = useCallback(() => onChange(Math.max(min, value - 1)), [value, min, onChange]);
  const inc = useCallback(() => onChange(Math.min(max, value + 1)), [value, max, onChange]);

  return (
    <Group gap="xs" wrap="nowrap" maw={90}>
      <ActionIcon
        bg="#DEE2E6"
        radius="md"
        onClick={dec}
        disabled={value <= min}
        aria-label="Decrease quantity"
        w={size}
        h={size}
        
      >
        <Minus size={16} color="black"  />
      </ActionIcon>

      <Text fw={600} w={rem(24)} ta="center">
        {value}
      </Text>

      <ActionIcon
        bg="#DEE2E6"
        radius="md"
        onClick={inc}
        disabled={value >= max}
        aria-label="Increase quantity"
        w={size}
        h={size}
      >
        <Plus size={16} color="black"/>
      </ActionIcon>
    </Group>
  );
}

